module.exports = function({ types: t }) {
  return {
    name: "transform-event-listeners",
    visitor: {
      CallExpression(path, state) {
        const callee = path.get("callee");
        if (
          callee.isMemberExpression() &&
          callee.get("property").isIdentifier({ name: "addEventListener" })
        ) {
          const args = path.get("arguments");
          if (args.length >= 2) {
            const eventType = args[0].evaluate().value;
            if (["scroll", "touchstart", "touchmove", "wheel"].includes(eventType)) {
              // Add passive option
              if (args.length === 2) {
                path.node.arguments.push(
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier("passive"),
                      t.booleanLiteral(true)
                    )
                  ])
                );
              } else if (args.length === 3 && args[2].isObjectExpression()) {
                const options = args[2].node.properties;
                const hasPassive = options.some(
                  prop =>
                    t.isObjectProperty(prop) &&
                    t.isIdentifier(prop.key, { name: "passive" })
                );
                if (!hasPassive) {
                  options.push(
                    t.objectProperty(
                      t.identifier("passive"),
                      t.booleanLiteral(true)
                    )
                  );
                }
              }
            }
          }
        }
      }
    }
  };
}; 