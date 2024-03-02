"use client"

import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TabContainer from "../../components/tab-container/tabContainer"
import { Profile } from '@/app/services/userService';

type Props = {
    markdown: string
    className?: string
    profile?: Profile
}

export default function ArticleRenderer(props: Props) {
    return <Markdown
        className={`prose prose-slate leading-snug my-4 prose-invert 
            prose-headings:mt-5 prose-headings:mb-2 prose-ul:mt-0 
            prose-pre:bg-transparent prose-pre:p-0 prose-li:my-1 ${props.className}`}
        components={{
        code(code_props) {
            const { children, className, node, ...rest } = code_props;
            //console.log(node)
            let langs = className.split('-')[1].split(',');
            let examples = (children as string).split('\n%%\n');

            let renderResult = [];
            for (var i = 0; i < langs.length; i++) {
            renderResult.push(
                <SyntaxHighlighter
                PreTag="div"
                language={langs[i]}
                style={{...theme}}
                codeTagProps={{className: "font-mono"}}
                showLineNumbers={true}
                showInlineLineNumbers={true}
                wrapLongLines={false}
                >
                    {examples[i].trim()}
                </SyntaxHighlighter>
            );
            }
            return (
                <TabContainer selected={props.profile ? props.profile.preferredLanguage : undefined} langs={langs} components={renderResult} />
            );
        }
        }}
    >
        {props.markdown}
    </Markdown>
}