# Scheduler Logs

Scheduler and queue runs are persisted in `SchedulerRunLog`.

Logged details include scheduler name, queue name, BullMQ job id, repeat job key, status, trigger type, attempt counts, input/output JSON, processed item count, start/finish timestamps, duration, and error details.

### List Scheduler Logs

| Field | Value |
| --- | --- |
| API name | List Scheduler Logs |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/scheduler-logs` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/scheduler-logs" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "scheduler_log_uuid",
      "schedulerName": "daily-reminder-check",
      "queueName": "daily-reminder-check",
      "jobName": "daily-reminder-check",
      "bullJobId": "repeat:daily-reminder-check",
      "repeatJobKey": "daily-reminder-check",
      "status": "SUCCESS",
      "triggerType": "REPEAT",
      "attempt": 1,
      "maxAttempts": null,
      "input": {},
      "output": {
        "due": 3,
        "sent": 2,
        "skippedAlreadySent": 1,
        "overdue": 1
      },
      "itemsProcessed": 3,
      "startedAt": "2026-07-05T08:00:00.000Z",
      "finishedAt": "2026-07-05T08:00:01.000Z",
      "durationMs": 1000,
      "errorName": null,
      "errorMessage": null,
      "errorStack": null,
      "createdAt": "2026-07-05T08:00:00.000Z",
      "updatedAt": "2026-07-05T08:00:01.000Z"
    }
  ]
}
```

### Get Scheduler Log

| Field | Value |
| --- | --- |
| API name | Get Scheduler Log |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/scheduler-logs/{id}` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/scheduler-logs/scheduler_log_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```
