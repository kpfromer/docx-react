/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./jsx/element-types.d.ts" />
/// <reference path="./jsx/intrinsic-elements.d.ts" />

import docx from 'docx';
import flattenDeep from 'lodash.flattendeep';

const { ExternalHyperlink, Paragraph, TextRun } = docx;

type AttributeValue = any;

export interface Children {
  children?: AttributeValue;
}

export interface CustomElementHandler {
  (attributes: Attributes & Children, contents: string[]): string;
}

export interface Attributes {
  [key: string]: AttributeValue;
}

const flattenAndDefragmentChildren = (children) =>
  // flatten
  flattenDeep<any>(children)
    // defragment
    .reduce(
      (items, child) =>
        child.type === 'fragment' ? [...items, ...child.children] : [...items, child],
      [],
    );

export function Fragment({ children }): any {
  return { type: 'fragment', children };
}

export function createElement(
  name: string | CustomElementHandler,
  attributes: (Attributes & Children) | undefined = {},
  ...contents: any[]
): any {
  const children = flattenAndDefragmentChildren((attributes && attributes.children) || contents);

  if (typeof name === 'string') {
    switch (name) {
      case 'section':
        return {
          children,
          properties: attributes,
        };
      case 'p':
        return new Paragraph({
          ...attributes,
          // TODO: extract this out
          // Ensure free text is converted to textrun
          children: children.map((child) => {
            if (typeof child === 'string') {
              return new TextRun(child);
            } else {
              return child;
            }
          }),
        });
      case 'external-link':
        return new ExternalHyperlink({
          link: attributes.link,
          children,
        });
      case 'text':
        return new TextRun({
          ...attributes,
          children,
        });
      default:
        throw new TypeError('Error');
    }
  } else {
    return name(children ? { children, ...attributes } : attributes, contents);
  }
}
