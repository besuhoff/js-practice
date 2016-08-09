var scheme = {
  "operator": "xor",
  "children": [
    {
      "operator": "and",
      "children": [
        {
          "state": 0
        },
        {
          "state": 1
        }
      ]
    },
    {
      "operator": "not",
      "children": [
        {
          "state": 1
        }
      ]
    }
  ]
};

function isLampOn(node) {
  if ('state' in node) { 
    // For switch, return a value
    return node.state; 

  } else if ('operator' in node) {
    // For gate, calculate values
    var result = 0, 
      childrenStates = node.children.map(function(childNode) {
        return isLampOn(childNode);
      });
    
    switch(node.operator) {
      case 'and':
        result = childrenStates[0] && childrenStates[1];
        break;
      case 'or':
        result = childrenStates[0] || childrenStates[1];
        break;
      case 'xor':
        result = childrenStates[0] ^ childrenStates[1];
        break;
      case 'not':
        result = !childrenStates[0];
        break;
    } 
    
    return result;
  } else {
    throw 'Unknown node type (not a gate, not a switch)';
  }
}

console.info(isLampOn(scheme));
