var e = Object.defineProperty,
  t = (t, s, o) =>
    ((t, s, o) =>
      s in t
        ? e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: o })
        : (t[s] = o))(t, 'symbol' != typeof s ? s + '' : s, o)
import { e as s, r as o, E as a } from './utils-Bueodsek.js'
class r {
  constructor(e) {
    t(this, 'apiKey'),
      t(this, 'baseUrl'),
      (this.apiKey = e),
      (this.baseUrl = s.DEEPSEEK_BASE_URL)
  }
  async generateChat(e, t = 'deepseek-chat', r = 4e3) {
    const n = await o(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: t,
        messages: e,
        max_tokens: r,
        temperature: 0.7,
      }),
      timeout: s.REQUEST_TIMEOUT,
    })
    if (!n.ok) throw a.createApiError(n.status, n.statusText, 'DeepSeek API')
    const i = await n.json()
    if (!i.choices || 0 === i.choices.length)
      throw a.createResponseError('空的响应', 'DeepSeek API')
    return i.choices[0].message.content
  }
  async generateWeeklyReport(e, t, r = 'deepseek-chat', n = 4e3) {
    var i
    const c = [
        { role: 'system', content: t },
        {
          role: 'user',
          content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
        },
      ],
      h = await o(`${s.DEEPSEEK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: r,
          messages: c,
          max_tokens: n,
          temperature: 0.7,
        }),
        timeout: s.REQUEST_TIMEOUT,
      })
    if (!h.ok) throw a.createApiError(h.status, h.statusText, 'DeepSeek API')
    const p = await h.json()
    if (!p.choices || 0 === p.choices.length)
      throw a.createResponseError('空的响应', 'DeepSeek API')
    return {
      content: p.choices[0].message.content,
      tokensUsed: (null == (i = p.usage) ? void 0 : i.total_tokens) || 0,
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
function n(e) {
  return new r(e)
}
export { r as DeepSeekApiService, n as createDeepSeekApiService }
