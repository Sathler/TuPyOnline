ace.define("ace/mode/tupy_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){var e="parar|avancar|senao|para|passo|se|retornar|enquanto|inclusive",t="logico|caracter|real|inteiro|cadeia|tipo|visual",n="val|ref|oculto|oculta",r="e|ou|nao|mod|div|xor",i="nulo|verdadeiro|falso|pi",s="escrever|ler|ler_linha|binario|octal|hexadecimal|aleatorio|inteiro_aleatorio|log|ln|raiz|exp|abs|min|max|sinal|piso|teto|arredondar|juntar|copiar|graus|radianos|sen|cos|tg|arcsen|arccos|arctg|arctg2|senh|cosh|tgh|arsenh|arcosh|artgh|lista|inserir|remover|embaralhar|grafo_MA|grafo_LA|digrafo_MA|digrafo_LA|arvore|matriz|vetor|pilha|fila|lista_encadeada|grafo_valorado_MA|digrafo_valorado_MA|grafo_valorado_LA|digrafo_valorado_LA|heap|comprimento|assercao",o=this.$keywords=this.createKeywordMapper({"keyword.control":e,"support.function":s,"storage.type":t,"storage.modifier":n,"keyword.operator":r,"variable.language":"this","constant.language":i},"identifier"),u="[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b",a=/\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source,f="%"+/(\d+\$)?/.source+/[#0\- +']*/.source+/[,;:_]?/.source+/((-?\d+)|\*(-?\d+\$)?)?/.source+/(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source+/(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source+/(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source;this.$rules={start:[{token:"comment",regex:"#|~~",next:"singleLineComment"},{token:"comment",regex:"-{3,}"},{token:"keyword.control",regex:"sen\u00e3o|avan\u00e7ar|at\u00e9|incl\\."},{token:"keyword.operator",regex:"n\u00e3o"},{token:"storage.type",regex:"l\u00f3gico"},{token:"support.function",regex:"bin\u00e1rio|aleat\u00f3rio|inteiro_aleat\u00f3rio|m\u00edn|m\u00e1x|\u00e1rvore|asser\u00e7\u00e3o"},{token:"constant.language",regex:"\u03c0"},{token:"string",regex:"'(?:"+a+"|.)?'"},{token:"string.start",regex:'"',stateName:"qqstring",next:[{token:"string",regex:/\\\s*$/,next:"qqstring"},{token:"constant.language.escape",regex:a},{token:"constant.language.escape",regex:f},{token:"string.end",regex:'"|$',next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"0[oO][0-7]+\\b"},{token:"constant.numeric",regex:"0[bB][01]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?)?\\b"},{token:o,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*"},{token:"keyword.operator",regex:/&&|\|\||[*\/+\-\^|~!<>=]=?/},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],singleLineComment:[{token:"comment",regex:/\\$/,next:"singleLineComment"},{token:"comment",regex:/$/,next:"start"},{defaultToken:"comment"}]},this.normalizeRules()};r.inherits(s,i),t.tupyHighlightRules=s}),ace.define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,s=t.FoldMode=function(e){this.foldingStartMarker=new RegExp("([\\[{])(?:\\s*)$|("+e+")(?:\\s*)(?:#.*)?$")};r.inherits(s,i),function(){this.getFoldWidgetRange=function(e,t,n){var r=e.getLine(n),i=r.match(this.foldingStartMarker);if(i)return i[1]?this.openingBracketBlock(e,i[1],n,i.index):i[2]?this.indentationBlock(e,n,i.index+i[2].length):this.indentationBlock(e,n)}}.call(s.prototype)}),ace.define("ace/mode/tupy",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/tupy_highlight_rules","ace/range","ace/mode/folding/pythonic"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("./tupy_highlight_rules").tupyHighlightRules,o=e("../range").Range,u=e("./folding/pythonic").FoldMode,a=function(){this.HighlightRules=s,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new u("\\:")};r.inherits(a,i),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.getTokenizer().getLineTokens(t,e),s=i.tokens;if(s.length&&s[s.length-1].type=="comment")return r;if(e=="start"){var o=t.match(/^.*[\{\(\[:]\s*$/);o&&(r+=n)}return r};var e={retornar:1,parar:1,avancar:1,"avan\u00e7ar":1};this.checkOutdent=function(t,n,r){if(r!=="\r\n"&&r!=="\r"&&r!=="\n")return!1;var i=this.getTokenizer().getLineTokens(n.trim(),t).tokens;if(!i)return!1;do var s=i.pop();while(s&&(s.type=="comment"||s.type=="text"&&s.value.match(/^\s+$/)));return s?s.type=="keyword"&&e[s.value]:!1},this.autoOutdent=function(e,t,n){n+=1;var r=this.$getIndent(t.getLine(n)),i=t.getTabString();r.slice(-i.length)==i&&t.remove(new o(n,r.length-i.length,n,r.length))},this.$id="ace/mode/tupy"}.call(a.prototype),t.Mode=a})