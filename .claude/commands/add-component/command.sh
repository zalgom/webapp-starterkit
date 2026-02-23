#!/bin/bash

set -e

COMPONENT_NAME="$1"

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: add-component <component-name>"
  echo "Examples: add-component Button, add-component my-button, add-component MyButton"
  exit 1
fi

# PascalCase로 변환
# kebab-case (my-component) → MyComponent
# camelCase (myComponent) → MyComponent
# PascalCase (MyComponent) → MyComponent
if echo "$COMPONENT_NAME" | grep -q '-'; then
  PASCAL_CASE=$(echo "$COMPONENT_NAME" | awk -F'-' '{
    for(i=1; i<=NF; i++) {
      printf "%s%s", toupper(substr($i,1,1)), substr($i,2)
    }
  }')
else
  PASCAL_CASE=$(echo "$COMPONENT_NAME" | sed 's/^./\U&/')
fi

# kebab-case로 변환
# MyComponent → my-component
KEBAB_CASE=$(echo "$PASCAL_CASE" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')

FILE_PATH="components/${KEBAB_CASE}.tsx"

# 컴포넌트 디렉토리 확인
if [ ! -d "components" ]; then
  echo "Error: components 디렉토리를 찾을 수 없습니다. 프로젝트 루트에서 실행해주세요."
  exit 1
fi

# 파일 중복 확인
if [ -f "$FILE_PATH" ]; then
  echo "Error: 파일이 이미 존재합니다: $FILE_PATH"
  exit 1
fi

# 컴포넌트 파일 생성
cat > "$FILE_PATH" << EOF
'use client';

interface ${PASCAL_CASE}Props {
  // Props을 여기에 추가하세요
}

export function ${PASCAL_CASE}({}: ${PASCAL_CASE}Props) {
  return (
    <div className="flex items-center justify-center p-4">
      <h1 className="text-2xl font-bold">${PASCAL_CASE}</h1>
    </div>
  );
}
EOF

echo "✓ 컴포넌트가 생성되었습니다: $FILE_PATH"
echo "  컴포넌트명: ${PASCAL_CASE}"
