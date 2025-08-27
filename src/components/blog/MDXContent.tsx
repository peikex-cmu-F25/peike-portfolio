import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'katex/dist/katex.min.css'

interface MDXContentProps {
  content: string
}

// Custom components for MDX rendering
const components = {
  // Code blocks
  pre: ({ children, ...props }: any) => {
    return <div className="relative">{children}</div>
  },
  
  code: ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    
    if (!language) {
      // Inline code
      return (
        <code 
          className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded text-sm font-mono" 
          {...props}
        >
          {children}
        </code>
      )
    }

    // Code block
    return (
      <div className="my-6 rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center justify-between bg-secondary-800 text-white px-4 py-2 text-sm">
          <span className="font-medium">{language}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(String(children))
            }}
            className="text-secondary-300 hover:text-white transition-colors duration-200"
            title="Copy code"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#1e293b',
            fontSize: '14px',
            lineHeight: '1.6'
          }}
          showLineNumbers={true}
          wrapLines={true}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    )
  },

  // Headings with auto-generated IDs
  h1: ({ children, ...props }: any) => (
    <h1 
      id={generateId(String(children))}
      className="text-3xl lg:text-4xl font-bold text-secondary-900 mt-12 mb-6 scroll-mt-24" 
      {...props}
    >
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <h2 
      id={generateId(String(children))}
      className="text-2xl lg:text-3xl font-bold text-secondary-900 mt-10 mb-5 scroll-mt-24" 
      {...props}
    >
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: any) => (
    <h3 
      id={generateId(String(children))}
      className="text-xl lg:text-2xl font-semibold text-secondary-900 mt-8 mb-4 scroll-mt-24" 
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: any) => (
    <h4 
      id={generateId(String(children))}
      className="text-lg lg:text-xl font-semibold text-secondary-900 mt-6 mb-3 scroll-mt-24" 
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children, ...props }: any) => (
    <p className="text-secondary-700 leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-2 transition-colors duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-2 mb-6 pl-4" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 pl-4" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: any) => (
    <li className="text-secondary-700 leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="border-l-4 border-primary-500 pl-6 my-8 italic text-secondary-600 bg-primary-50 py-4 rounded-r-lg" 
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border border-secondary-200 rounded-lg" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: any) => (
    <thead className="bg-secondary-100" {...props}>
      {children}
    </thead>
  ),

  th: ({ children, ...props }: any) => (
    <th className="px-4 py-3 text-left font-semibold text-secondary-900 border-b border-secondary-200" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: any) => (
    <td className="px-4 py-3 text-secondary-700 border-b border-secondary-200" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: (props: any) => (
    <hr className="my-12 border-t-2 border-secondary-200" {...props} />
  ),

  // Images
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg shadow-md"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-secondary-500 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Strong and emphasis
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-secondary-900" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }: any) => (
    <em className="italic text-secondary-700" {...props}>
      {children}
    </em>
  ),
}

// Helper function to generate heading IDs
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Simple markdown-to-HTML converter for basic formatting
const convertMarkdownToHTML = (content: string): string => {
  let html = content

  // Convert headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')

  // Convert paragraphs
  html = html.replace(/^\s*$/gm, '</p><p>')
  html = '<p>' + html + '</p>'
  html = html.replace(/<p><\/p>/g, '')

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code className="language-${lang || 'text'}">${code.trim()}</code></pre>`
  })

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  return html
}

const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  // Convert markdown content to HTML
  const htmlContent = convertMarkdownToHTML(content)

  // Simple component renderer
  const renderContent = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const elements = Array.from(doc.body.children)

    return elements.map((element, index) => {
      const tagName = element.tagName.toLowerCase()
      const Component = components[tagName as keyof typeof components] || tagName
      
      return (
        <Component key={index} {...getElementProps(element)}>
          {element.innerHTML}
        </Component>
      )
    })
  }

  const getElementProps = (element: Element) => {
    const props: any = {}
    
    // Copy attributes
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i]
      props[attr.name] = attr.value
    }

    return props
  }

  return (
    <div className="prose prose-lg prose-secondary max-w-none">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

export default MDXContent