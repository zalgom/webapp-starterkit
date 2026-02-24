#!/usr/bin/env bash
# Claude Code 권한 요청 시 슬랙 알림 발송

set -euo pipefail

# 비-인터랙티브 쉘 환경변수 로드
[ -f "$HOME/.zprofile" ] && source "$HOME/.zprofile" 2>/dev/null || true
[ -f "$HOME/.claude/.env" ] && source "$HOME/.claude/.env" 2>/dev/null || true

# 웹훅 URL 미설정 시 조용히 종료
[ -z "${SLACK_WEBHOOK_URL:-}" ] && exit 0

# stdin에서 JSON 읽기
INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
MESSAGE=$(echo "$INPUT" | jq -r '.message // "알림 없음"')
CWD=$(echo "$INPUT" | jq -r '.cwd // "unknown"')
PROJECT=$(basename "$CWD")
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

PAYLOAD=$(jq -n \
  --arg project "$PROJECT" \
  --arg message "$MESSAGE" \
  --arg session_id "$SESSION_ID" \
  --arg timestamp "$TIMESTAMP" \
  '{
    "blocks": [
      {"type":"header","text":{"type":"plain_text","text":"🔔 Claude Code 권한 요청","emoji":true}},
      {"type":"section","fields":[
        {"type":"mrkdwn","text":"*프로젝트:*\n`\($project)`"},
        {"type":"mrkdwn","text":"*시각:*\n\($timestamp)"}
      ]},
      {"type":"section","text":{"type":"mrkdwn","text":"*요청 내용:*\n\($message)"}},
      {"type":"context","elements":[
        {"type":"mrkdwn","text":"세션: `\($session_id | .[0:8])...` | Claude Code가 허가를 기다리고 있습니다"}
      ]}
    ]
  }')

curl -s -o /dev/null -X POST \
  -H "Content-type: application/json" \
  --data "$PAYLOAD" --max-time 5 "$SLACK_WEBHOOK_URL" || true

exit 0
