import { visit } from 'unist-util-visit';

/**
 * Turns plain-Markdown conventions into the styled guide components, so a
 * guide author never has to write HTML or MDX — just a .md file. See
 * HOW_TO_ADD_A_GUIDE.md for the conventions this plugin implements:
 *
 *  ```prompt              -> copy-to-clipboard prompt box
 *  ...
 *  ```
 *
 *  ![caption](img "cap")  -> <figure> with a <figcaption>
 *
 *  a paragraph containing only a link to /downloads/...  -> download button
 */
export function rehypeGuideComponents() {
  return (tree) => {
    // 1. ```prompt fenced code blocks -> copy-to-clipboard prompt box
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children?.[0]?.tagName === 'code'
      ) {
        const codeNode = node.children[0];
        const classNames = codeNode.properties?.className || [];
        if (classNames.includes('language-prompt')) {
          const codeText = getTextContent(codeNode);
          const wrapper = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['prompt-box'], 'data-prompt-text': codeText },
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['prompt-box-header'] },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: { className: ['prompt-box-label'] },
                    children: [{ type: 'text', value: 'פרומפט להעתקה' }],
                  },
                  {
                    type: 'element',
                    tagName: 'button',
                    properties: {
                      type: 'button',
                      className: ['prompt-copy-btn'],
                      'data-copy-target': 'true',
                    },
                    children: [{ type: 'text', value: 'העתק' }],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'pre',
                properties: { className: ['prompt-box-content'] },
                children: [codeNode],
              },
            ],
          };
          parent.children[index] = wrapper;
        }
      }
    });

    // 2. images with a title -> <figure><img/><figcaption>
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'p' && node.children?.length === 1 && node.children[0].tagName === 'img') {
        const img = node.children[0];
        const caption = img.properties?.title;
        img.properties.loading = 'lazy';
        img.properties.decoding = 'async';
        const figureChildren = [
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['screenshot-frame'] },
            children: [img],
          },
        ];
        if (caption) {
          figureChildren.push({
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: caption }],
          });
        }
        parent.children[index] = {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['guide-screenshot'] },
          children: figureChildren,
        };
      }
    });

    // 3. a paragraph that is ONLY a link to /downloads/... -> download button
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'p' && node.children?.length === 1 && node.children[0].tagName === 'a') {
        const a = node.children[0];
        const href = a.properties?.href || '';
        if (typeof href === 'string' && href.startsWith('/downloads/')) {
          a.properties.className = [...(a.properties.className || []), 'download-button'];
          a.properties.download = true;
          a.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['download-button-icon'], 'aria-hidden': 'true' },
              children: [{ type: 'text', value: '⬇' }],
            },
            ...a.children,
          ];
          parent.children[index] = { ...node, tagName: 'div', properties: { className: ['download-button-wrap'] } };
        }
      }
    });

    // 4. a blockquote starting with "מה זה לא עושה" -> limitations box
    visit(tree, 'element', (node) => {
      if (node.tagName === 'blockquote') {
        const text = getTextContent(node);
        if (text.trim().startsWith('מה זה לא עושה')) {
          node.properties = node.properties || {};
          node.properties.className = [...(node.properties.className || []), 'limitations-box'];
        }
      }
    });
  };
}

function getTextContent(node) {
  if (node.type === 'text') return node.value;
  if (!node.children) return '';
  return node.children.map(getTextContent).join('');
}
