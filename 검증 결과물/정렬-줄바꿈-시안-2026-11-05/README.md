# 대사 글 정렬·줄바꿈 비교

앱의 실제 PNG 저장 경로로 출력했다. 각 이미지에는 짧은 영·한 혼합 대사, 긴 영어 대사, 긴 한글 대사가 들어 있다. 아래 비교 12장은 변경 전 시안으로, 비교용 CSS만 출력 시 주입했다. 이후 확정된 기본값은 다음 표의 PNG에서 확인할 수 있다.

| 적용 결과 | PNG |
| --- | --- |
| 말풍선 | [보기](applied-bubble.png) |
| 인용 | [보기](applied-quote.png) |
| 각본 | [보기](applied-script.png) |
| 없음 | [보기](applied-none.png) |
| 알림 | [보기](applied-notification.png) |
| 트윗 | [보기](applied-tweet.png) |
| 테마 목록: 프리셋 복제·사용자 테마 수정 | [보기](applied-theme-grid.png) |

| 대사 스타일 | 정렬: 왼쪽·오른쪽·가운데·양쪽 | 줄바꿈: 글자·혼합·단어 |
| --- | --- | --- |
| 말풍선 | [PNG](bubble-alignment.png) | [PNG](bubble-wrapping.png) |
| 인용 | [PNG](quote-alignment.png) | [PNG](quote-wrapping.png) |
| 각본 | [PNG](script-alignment.png) | [PNG](script-wrapping.png) |
| 없음 | [PNG](none-alignment.png) | [PNG](none-wrapping.png) |
| 알림 | [PNG](notification-alignment.png) | [PNG](notification-wrapping.png) |
| 트윗 | [PNG](tweet-alignment.png) | [PNG](tweet-wrapping.png) |

정렬 이미지는 모두 단어 유지 줄바꿈으로 고정해 정렬 효과만 비교한다. 줄바꿈 이미지는 모두 왼쪽 정렬로 고정한다. 여기서 **혼합**은 CSS `word-break: normal`로, 영어 단어를 지키면서 한글은 음절 사이에서 줄을 바꿀 수 있다. **단어**는 `word-break: keep-all`로, 한글도 띄어쓰기 단위로 먼저 줄을 바꾼다. 세 방식 모두 긴 공백 없는 문자열이 영역을 넘지 않도록 `overflow-wrap: break-word`를 사용했다.

## 비교에서 확인한 점

- 긴 영어는 글자 단위에서 단어가 중간에 끊긴다. 한글은 단어 유지에서 빈 줄 끝이 커지고 줄 수가 늘 수 있다. 따라서 영어와 한글을 섞어 쓰는 기본값은 **혼합**이 가장 균형적이다.
- 긴 문단에서 오른쪽·가운데 정렬은 줄마다 시작점이 달라져 읽기 어렵다. 양쪽 정렬은 한글 띄어쓰기 간격이 과하게 벌어진다. 대사 본문은 **왼쪽 정렬**을 권장한다. 이름·프로필·대사 묶음의 좌우 위치는 별개로 유지한다.
- 인용은 양쪽 배치를 없애고 항상 왼쪽에 놓았다. 한 줄 인용의 세로선은 프로필 높이로 늘리지 않고 실제 대사 높이를 따른다.
- 각본은 화자와 관계없이 왼쪽에 놓고 대사 본문은 양쪽 정렬한다. 이어지는 대사는 빈 프로필의 높이를 없애고 첫 대사 아래의 여분도 접었다. 프로필과 글 사이 간격은 11px이다.
- 없음은 화자 방향에 따라 좌우로 놓고, 알림·트윗은 왼쪽에 놓는다. 모든 대사 스타일에 혼합 줄바꿈을 적용했다.
- 스타일별 본문 정렬은 본문 일반 텍스트의 정렬과 분리하는 것을 권장한다. 일반 텍스트의 가운데·양쪽 정렬을 카드·말풍선에 전파하면 긴 대사 가독성과 원형 UI의 완성도가 동시에 흔들린다. 사용자 선택 옵션은 별도로 둘 수 있다.

참고: [W3C CSS Text Level 4](https://www.w3.org/TR/css-text-4/), [Chrome 글꼴 가이드](https://developer.chrome.com/docs/modern-web-guidance/guides/visual-design/typography?hl=ko), [315 발췌기](https://mok0999.github.io/315/chat.html), [슝 발췌기](https://tbdtbdp0.github.io/shoong.chat_formatter/), [Violet 발췌기](https://violet-7f00ff.github.io/chat.html).

검증: `render-options.cjs`가 비교 PNG 12장을 만들었다. `check-defaults.cjs`는 적용 결과 PNG 6장을 만들고 Chromium·WebKit에서 화자 위치, 정렬, 줄바꿈, 인용 선 높이를 확인한다. `theme-grid-check.cjs`는 프리셋 복제·사용자 테마 편집·길게 누른 순서 변경·새로고침 후 순서 유지를 두 엔진에서 확인한다. 비교 측정은 [measurements.json](measurements.json)에 있다.
