import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, lastValueFrom } from 'rxjs';
import { ApiResponseInterceptor } from './api-response.interceptor';

const context = {} as ExecutionContext;

function callHandler(response: unknown): CallHandler {
  return { handle: () => of(response) };
}

describe('ApiResponseInterceptor', () => {
  const interceptor = new ApiResponseInterceptor();

  it('removes sensitive hash fields from wrapped responses', async () => {
    const response = await lastValueFrom(
      interceptor.intercept(
        context,
        callHandler({
          message: 'ok',
          data: {
            user: {
              id: 'user-id',
              email: 'admin@example.com',
              passwordHash: 'hashed-password',
              profile: { tokenHash: 'hashed-refresh-token' },
            },
          },
        }),
      ),
    );

    expect(response).toEqual({
      success: true,
      message: 'ok',
      data: {
        user: {
          id: 'user-id',
          email: 'admin@example.com',
          profile: {},
        },
      },
      meta: undefined,
    });
  });

  it('preserves intentionally returned auth tokens', async () => {
    const response = await lastValueFrom(
      interceptor.intercept(
        context,
        callHandler({
          success: true,
          data: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            passwordHash: 'hashed-password',
            sessions: [{ tokenHash: 'hashed-refresh-token' }],
          },
        }),
      ),
    );

    expect(response).toEqual({
      success: true,
      data: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        sessions: [{}],
      },
    });
  });
});
