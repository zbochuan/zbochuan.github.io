const fs = require('fs');
const path = require('path');

// 存储主题CSS，避免重复加载
let themeCSS = null;

// 加载Shiki主题CSS
function loadThemeCSS() {
        if (themeCSS) return themeCSS;

        // 这里使用预编译的CSS，你可以从Shiki GitHub仓库获取
        const themePath = path.join(__dirname, '../source/css/shiki-theme.css');

        if (fs.existsSync(themePath)) {
                themeCSS = fs.readFileSync(themePath, 'utf8');
        } else {
                // 提供一个默认的暗色主题CSS
                themeCSS = getDefaultThemeCSS();
        }

        return themeCSS;
}

// 简单的语法高亮器（基于正则表达式）
function highlightCode(code, language) {
        const rules = getLanguageRules(language);
        let highlightedCode = escapeHtml(code);

        // 应用语法高亮规则
        rules.forEach(rule => {
                highlightedCode = highlightedCode.replace(rule.pattern, rule.replacement);
        });

        return highlightedCode;
}

// 获取语言规则
function getLanguageRules(language) {
        const rules = {
                javascript: [
                        { pattern: /\b(const|let|var|function|class|import|export|return|if|else|for|while|try|catch)\b/g, replacement: '<span class="token keyword">$1</span>' },
                        { pattern: /\b(true|false|null|undefined)\b/g, replacement: '<span class="token boolean">$1</span>' },
                        { pattern: /\b\d+\b/g, replacement: '<span class="token number">$1</span>' },
                        { pattern: /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, replacement: '<span class="token string">$1$2$1</span>' },
                        { pattern: /\/\/.*$/gm, replacement: '<span class="token comment">$&</span>' },
                        { pattern: /\/\*[\s\S]*?\*\//g, replacement: '<span class="token comment">$&</span>' }
                ],
                python: [
                        { pattern: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|with|as)\b/g, replacement: '<span class="token keyword">$1</span>' },
                        { pattern: /\b(True|False|None)\b/g, replacement: '<span class="token boolean">$1</span>' },
                        { pattern: /\b\d+\b/g, replacement: '<span class="token number">$1</span>' },
                        { pattern: /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, replacement: '<span class="token string">$1$2$1</span>' },
                        { pattern: /#.*$/gm, replacement: '<span class="token comment">$&</span>' }
                ],
                cpp: [
                        { pattern: /\b(int|char|float|double|void|bool|class|struct|public|private|protected|return|if|else|for|while|do|switch|case|break|continue|#include|#define|namespace|using)\b/g, replacement: '<span class="token keyword">$1</span>' },
                        { pattern: /\b(true|false|NULL|nullptr)\b/g, replacement: '<span class="token boolean">$1</span>' },
                        { pattern: /\b\d+\b/g, replacement: '<span class="token number">$1</span>' },
                        { pattern: /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, replacement: '<span class="token string">$1$2$1</span>' },
                        { pattern: /\/\/.*$/gm, replacement: '<span class="token comment">$&</span>' },
                        { pattern: /\/\*[\s\S]*?\*\//g, replacement: '<span class="token comment">$&</span>' }
                ],
                vhdl: [
                        // VHDL关键字 - 分类处理
                        {
                                pattern: /\b(entity|architecture|library|use|package|component|port|generic|map|signal|variable|constant|type|subtype|array|record|access|file)\b/gi,
                                replacement: '<span class="token keyword-declaration">$1</span>'
                        },
                        {
                                pattern: /\b(process|begin|end|if|then|else|elsif|case|when|for|while|loop|next|exit|wait|return)\b/gi,
                                replacement: '<span class="token keyword-control">$1</span>'
                        },
                        {
                                pattern: /\b(and|or|not|xor|nand|nor|xnor|sll|srl|sla|sra|rol|ror)\b/gi,
                                replacement: '<span class="token keyword-operator">$1</span>'
                        },
                        {
                                pattern: /\b(std_logic|std_logic_vector|bit|bit_vector|boolean|integer|natural|positive|real|time|string)\b/gi,
                                replacement: '<span class="token type">$1</span>'
                        },
                        {
                                pattern: /\b(rising_edge|falling_edge|event|stable|last_event|last_active|last_value)\b/gi,
                                replacement: '<span class="token function-attribute">$1</span>'
                        },
                        // 数字和位向量
                        {
                                pattern: /\b\d+\b/g,
                                replacement: '<span class="token number">$1</span>'
                        },
                        {
                                pattern: /("[01xzwlhu-]+"|'[01xzwlhu]')/gi,
                                replacement: '<span class="token bit-vector">$1</span>'
                        },
                        {
                                pattern: /(".*?"|'.')/g,
                                replacement: '<span class="token string">$1</span>'
                        },
                        // 时间单位
                        {
                                pattern: /\b\d+\s*(ns|us|ms|sec|min|hr|ps|fs)\b/gi,
                                replacement: '<span class="token time-unit">$1</span>'
                        },
                        // 注释
                        {
                                pattern: /--.*$/gm,
                                replacement: '<span class="token comment">$&</span>'
                        },
                        // 操作符
                        {
                                pattern: /(<=|=>|:=|\*\*|\/=|>=|<=|<>)/g,
                                replacement: '<span class="token operator">$1</span>'
                        },
                        // 端口方向
                        {
                                pattern: /\b(in|out|inout|buffer|linkage)\b/gi,
                                replacement: '<span class="token port-direction">$1</span>'
                        },
                        // 标准库
                        {
                                pattern: /\b(ieee|std|work|std_logic_1164|numeric_std|std_logic_arith|std_logic_unsigned|std_logic_signed)\b/gi,
                                replacement: '<span class="token library">$1</span>'
                        }
                ],

                // Verilog支持（额外bonus）
                verilog: [
                        {
                                pattern: /\b(module|endmodule|input|output|inout|wire|reg|parameter|localparam|always|initial|begin|end|if|else|case|endcase|for|while|repeat|forever|assign)\b/g,
                                replacement: '<span class="token keyword">$1</span>'
                        },
                        {
                                pattern: /\b(posedge|negedge|and|or|not|xor|nand|nor|xnor)\b/g,
                                replacement: '<span class="token keyword-operator">$1</span>'
                        },
                        {
                                pattern: /\b\d+('[bB][01_]+|'[oO][0-7_]+|'[hH][0-9a-fA-F_]+|'[dD]\d+)?\b/g,
                                replacement: '<span class="token number">$1</span>'
                        },
                        {
                                pattern: /\/\/.*$/gm,
                                replacement: '<span class="token comment">$&</span>'
                        },
                        {
                                pattern: /\/\*[\s\S]*?\*\//g,
                                replacement: '<span class="token comment">$&</span>'
                        }
                ]
        };

        return rules[language] || [];
};


// HTML转义
function escapeHtml(text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
}

// 默认主题CSS
function getDefaultThemeCSS() {
        return `
.shiki {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  margin: 1rem 0;
}

.shiki code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-family: inherit;
}

.token.keyword {
  color: #9f7efe;
  font-weight: bold;
}

.token.string {
  color: #98d982;
}

.token.comment {
  color: #6a737d;
  font-style: italic;
}

.token.number {
  color: #f8c555;
}

.token.boolean {
  color: #ff6b6b;
}

.token.function {
  color: #82aaff;
}

.token.operator {
  color: #c792ea;
}

.shiki .line {
  display: block;
}

.shiki .line.highlight {
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 -1rem;
  padding: 0 1rem;
}
`;
}

// 注册Hexo过滤器
hexo.extend.filter.register('before_post_render', function (data) {
        // 处理代码块
        data.content = data.content.replace(/```(\w+)?\n([\s\S]*?)```/g, function (match, lang, code) {
                const language = lang || 'text';
                const highlightedCode = highlightCode(code.trim(), language);

                return `<pre class="shiki"><code class="language-${language}">${highlightedCode}</code></pre>`;
        });

        return data;
});

// 注入CSS到页面
hexo.extend.filter.register('after_render:html', function (str) {
        if (str.includes('class="shiki"')) {
                const css = loadThemeCSS();
                const styleTag = `<style>${css}</style>`;

                // 在</head>前插入CSS
                str = str.replace('</head>', `${styleTag}\n</head>`);
        }

        return str;
});