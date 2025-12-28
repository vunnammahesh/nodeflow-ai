// store.js

import { create } from "zustand";
import { NODE_RULES } from "./edgeRules";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  validationError: null,
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  setValidationError: (error) => set({ validationError: error }),
  clearValidationError: () => set({ validationError: null }),
  onConnect: (connection) => {
    const { source, target } = connection;
    const { nodes, edges, setValidationError } = get();

    const sourceNode = nodes.find((n) => n.id === source);
    const targetNode = nodes.find((n) => n.id === target);

    if (!sourceNode || !targetNode) return;

    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    const sourceRules = NODE_RULES[sourceType] || {};
    const targetRules = NODE_RULES[targetType] || {};

    const incomingCount = edges.filter((e) => e.target === target).length;

    if (sourceRules.maxOutgoing === 0) {
      setValidationError("Output node cannot have outgoing connections");
      return;
    }

    if (targetRules.maxIncoming === 0) {
      setValidationError("Input node cannot have incoming connections");
      return;
    }

    if (incomingCount >= (targetRules.maxIncoming ?? Infinity)) {
      setValidationError("This node allows only one input");
      return;
    }

    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
