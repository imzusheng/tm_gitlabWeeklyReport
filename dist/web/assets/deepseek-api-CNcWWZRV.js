var e = Object.defineProperty,
  t = (t, s, a) =>
    ((t, s, a) =>
      s in t
        ? e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (t[s] = a))(t, 'symbol' != typeof s ? s + '' : s, a)
import { A as s, r as a, E as r } from './utils-EGKi2QSB.js'
class n {
  constructor(e) {
    t(this, 'apiKey'),
      t(this, 'baseUrl'),
      (this.apiKey = e),
      (this.baseUrl = s.DEEPSEEK_BASE_URL)
  }
  async chatRequest(e, t, n) {
    const o = await a(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: t,
        messages: e,
        max_tokens: n,
        temperature: 0.7,
      }),
      timeout: s.REQUEST_TIMEOUT,
    })
    if (!o.ok) throw r.createApiError(o.status, o.statusText, 'DeepSeek API')
    const i = await o.json()
    if (!i.choices || 0 === i.choices.length)
      throw r.createResponseError('空的响应', 'DeepSeek API')
    return i
  }
  async generateChat(e, t = 'deepseek-chat', s = 4e3) {
    return (await this.chatRequest(e, t, s)).choices[0].message.content
  }
  async generateWeeklyReport(e, t, s = 'deepseek-chat', a = 4e3) {
    var r
    const n = [
        { role: 'system', content: t },
        {
          role: 'user',
          content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
        },
      ],
      o = await this.chatRequest(n, s, a)
    return {
      content: o.choices[0].message.content,
      tokensUsed: (null == (r = o.usage) ? void 0 : r.total_tokens) || 0,
    }
  }
  async validateApiKey() {
    try {
      return (
        await this.generateChat(
          [{ role: 'user', content: 'Hello' }],
          'deepseek-chat',
          10,
        ),
        !0
      )
    } catch (e) {
      return !1
    }
  }
}
function o(e) {
  return new n(e)
}
export { n as DeepSeekApiService, o as createDeepSeekApiService }
