var dt=function(){function n(b){var c=v,e=b.trainingSet,d=b.ignoredAttributes,a={};if(d)for(var f in d)a[d[f]]=!0;this.root=c({trainingSet:e,ignoredAttributes:a,categoryAttr:b.categoryAttr||"category",minItemsCount:b.minItemsCount||1,entropyThrehold:b.entropyThrehold||0.01,maxTreeDepth:b.maxTreeDepth||70})}function p(b,c){for(var e=b.trainingSet,d=[],a=0;a<c;a++)d[a]=[];for(a=e.length-1;0<=a;a--)d[a%c].push(e[a]);e=[];for(a=0;a<c;a++){b.trainingSet=d[a];var f=new n(b);e.push(f)}this.trees=e}function q(b,
  c){for(var e={},d=b.length-1;0<=d;d--)e[b[d][c]]=0;for(d=b.length-1;0<=d;d--)e[b[d][c]]+=1;return e}function w(b,c){var e=q(b,c),d=0,a,f;for(f in e)a=e[f]/b.length,d+=-a*Math.log(a);return d}function x(b,c){var e=q(b,c),d=0,a,f;for(f in e)e[f]>d&&(d=e[f],a=f);return a}function v(b){var c=b.trainingSet,e=b.minItemsCount,d=b.categoryAttr,a=b.entropyThrehold,f=b.maxTreeDepth,n=b.ignoredAttributes;if(0==f||c.length<=e)return{category:x(c,d)};e=w(c,d);if(e<=a)return{category:x(c,d)};for(var m={},a={gain:0},
  y=c.length-1;0<=y;y--){var p=c[y],k;for(k in p)if(k!=d&&!n[k]){var s=p[k],t;t="number"==typeof s?">=":"==";var r=k+t+s;if(!m[r]){m[r]=!0;var r=D[t],g;g=c;for(var l=k,z=r,h=s,q=[],B=[],u=void 0,C=void 0,A=g.length-1;0<=A;A--)u=g[A],C=u[l],z(C,h)?q.push(u):B.push(u);g={match:q,notMatch:B};l=w(g.match,d);z=w(g.notMatch,d);h=0;h+=l*g.match.length;h+=z*g.notMatch.length;h/=c.length;l=e-h;l>a.gain&&(a=g,a.predicateName=t,a.predicate=r,a.attribute=k,a.pivot=s,a.gain=l)}}}if(!a.gain)return{category:x(c,d)};
  b.maxTreeDepth=f-1;b.trainingSet=a.match;c=v(b);b.trainingSet=a.notMatch;b=v(b);return{attribute:a.attribute,predicate:a.predicate,predicateName:a.predicateName,pivot:a.pivot,match:c,notMatch:b,matchedCount:a.match.length,notMatchedCount:a.notMatch.length}}n.prototype.predict=function(b){a:{for(var c=this.root,e,d,a;;){if(c.category){b=c.category;break a}e=c.attribute;e=b[e];d=c.predicate;a=c.pivot;c=d(e,a)?c.match:c.notMatch}b=void 0}return b};p.prototype.predict=function(b){var c=this.trees,e={},
  d;for(d in c){var a=c[d].predict(b);e[a]=e[a]?e[a]+1:1}return e};var D={"==":function(b,c){return b==c},">=":function(b,c){return b>=c}},m={};m.DecisionTree=n;m.RandomForest=p;return m}();