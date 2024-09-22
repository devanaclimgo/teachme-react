import OpenAI from "openai"

type Message = {
	role: 'user' | 'assistant'
	content: string
}

const openai = new OpenAI({
	apiKey: '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',
	dangerouslyAllowBrowser: true
})

export async function sendMessage(messages: Message[]) {
	const response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: messages.map(message => (
			{ role: message.role, content: message.content }
		))
	})

	return {
		role: response.choices[0].message.role,
		content: response.choices[0].message.content || ''
	}
}