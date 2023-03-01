import axios from 'axios'
import { OPENAI_API_KEY, OPENAI_MODEL } from '../config'
import fs from 'fs'
import path from 'path'

const OPENAI_API_URL = 'https://api.openai.com/v1/completions'

const history = new Map<string, Map<string, string[]>>()

const loadTemplate = (template: string) => {
  if (template.includes('..') || template.includes('/')) return ''
  const starterPath = path.join(__dirname, '..', 'template', 'starter.txt')
  const templatePath = path.join(__dirname, '..', 'template', `${template}.txt`)

  const starter = fs.readFileSync(starterPath, 'utf8')
  const templateText = fs.readFileSync(templatePath, 'utf8')

  return starter + '\n\n###\n\n' + templateText
}

export const chat = async (prompt: string, uid: string, templateId: string) => {
  const template = loadTemplate(templateId)
  if (!template) return 'Invalid template'

  if (!history.has(uid)) history.set(uid, new Map<string, string[]>())
  if (!history.get(uid)?.has(templateId)) history.get(uid)?.set(templateId, [])

  const historyList = history.get(uid)?.get(templateId) as string[]

  const response = await axios.post(OPENAI_API_URL, {
    prompt: template + '\n\n###\n\n' + historyList.join('###'),
    max_tokens: 200,
    model: OPENAI_MODEL,
    stop: ['###'],
  })

  const text = response.data.choices[0].text

  historyList.push(prompt)
  historyList.push(text)

  return text
}