export const findDisconnectedNodes = (nodes, edges) => {
  const connectedNodeIds = new Set();

  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  return nodes.filter((node) => !connectedNodeIds.has(node.id));
};
