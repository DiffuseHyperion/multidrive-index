import {ListedGenericFile} from "@/lib/files"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"
import {unified} from "unified"

export default async function MarkdownViewer({file}: { file: ListedGenericFile }) {
    const content = await fetch(file.path)
    if (!content.ok) return null
    const text = await content.text()

    const markdownHTML = (
        await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(text)
    ).toString()

    return (
        <div className={"prose-p:overflow-x-hidden " +
                "prose-code:bg-secondary " +
                "prose-a:underline " +
                "prose-ul:list-disc prose-ul:list-inside"}
            dangerouslySetInnerHTML={{__html: markdownHTML}}/>
    )
}