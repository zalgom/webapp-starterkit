#!/usr/bin/env bash
# Claude Code 작업 완료 시 슬랙 알림 발송

set -euo pipefail

[ -f "$HOME/.zprofile" ] && source "$HOME/.zprofile" 2>/dev/null || true
[ -f "$HOME/.claude/.env" ] && source "$HOME/.claude/.env" 2>/dev/null || true

[ -z "${SLACK_WEBHOOK_URL:-}" ] && exit 0

INPUT=$(cat)
STOP_HOOK_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')

# stop_hook_active: true → 무한 루프 방지 (반드시 체크)
[ "$STOP_HOOK_ACTIVE" = "true" ] && exit 0

SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
CWD=$(echo "$INPUT" | jq -r '.cwd // "unknown"')
PROJECT=$(basename "$CWD")
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

PAYLOAD=$(jq -n \
  --arg project "$PROJECT" \
  --arg session_id "$SESSION_ID" \
  --arg timestamp "$TIMESTAMP" \
  '{
    "blocks": [
      {"type":"header","text":{"type":"plain_text","text":"✅ Claude Code 작업 완료","emoji":true}},
      {"type":"section","fields":[
        {"type":"mrkdwn","text":"*프로젝트:*\n`\($project)`"},
        {"type":"mrkdwn","text":"*완료 시각:*\n\($timestamp)"}
      ]},
      {"type":"context","elements":[
        {"type":"mrkdwn","text":"세션: `\($session_id | .[0:8])...` | 답변이 준비되었습니다"}
      ]}
    ]
  }')

curl -s -o /dev/null -X POST \
  -H "Content-type: application/json" \
  --data "$PAYLOAD" --max-time 5 "$SLACK_WEBHOOK_URL" || true

exit 0
