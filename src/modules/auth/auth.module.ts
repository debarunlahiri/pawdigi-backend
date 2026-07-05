import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { CustomerAuthController } from './controllers/customer-auth.controller';
import { VendorAuthController } from './controllers/vendor-auth.controller';
import { AdminAuthService } from './services/admin-auth.service';
import { CustomerAuthService } from './services/customer-auth.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { TokenService } from './services/token.service';
import { VendorAuthService } from './services/vendor-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({ global: true })],
  controllers: [CustomerAuthController, AdminAuthController, VendorAuthController],
  providers: [CustomerAuthService, AdminAuthService, VendorAuthService, TokenService, RefreshTokenService, JwtStrategy],
})
export class AuthModule {}
