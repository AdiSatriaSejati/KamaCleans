module.exports = function({ types: t }) {
  return {
    name: "transform-event-listeners",
    visitor: {
      CallExpression(path) {
        const callee = path.get("callee");
        if (
          callee.isMemberExpression() &&
          callee.get("property").isIdentifier({ name: "addEventListener" })
        ) {
          const args = path.get("arguments");
          if (args.length >= 2) {
            const eventType = args[0].evaluate().value;
            if (["scroll", "touchstart", "touchmove", "wheel"].includes(eventType)) {
              // Tambahkan passive option
              if (args.length === 2) {
                path.node.arguments.push(
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier("passive"),
                      t.booleanLiteral(true)
                    )
                  ])
                );
              }
            }
          }
        }
      }
    }
  };
}; 