export function renderMarkdown(markdown: string): string {
  // Basic markdown rendering - in production, use a proper markdown parser like marked or remark
  return markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-electric-400 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-neon-400 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-electric-400 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-electric-400">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-neon-400">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-deep-blue-800 px-2 py-1 rounded text-neon-400">$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-deep-blue-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-slate-300">$1</code></pre>')
    .replace(/\n\n/g, '</p><p class="text-slate-300 mb-4">')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p class="text-slate-300 mb-4">')
    .replace(/$/, '</p>');
}
