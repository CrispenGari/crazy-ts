class Graph<T extends string> {
  private adjacencyList: Record<string, Set<T>>;
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1: T, vertex2: T) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  removeEdge(vertex1: T, vertex2: T) {
    this.adjacencyList[vertex1].delete(vertex2);
    this.adjacencyList[vertex2].delete(vertex1);
  }
  removeVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) {
      return;
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  hasEdge(vertex1: T, vertex2: T) {
    return (
      this.adjacencyList[vertex1].has(vertex2) &&
      this.adjacencyList[vertex2].has(vertex1)
    );
  }
  display() {
    for (const vertex in this.adjacencyList) {
      console.log(`vertex ${vertex}:`, [...this.adjacencyList[vertex]]);
    }
  }
}

const graph = new Graph<string>();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");

graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "B");
graph.display();
console.log("-------------------");
graph.removeEdge("B", "C");
graph.display();
console.log("-------------------");
graph.removeVertex("C");
graph.display();
console.log("-------------------");
console.log({
  aHasB: graph.hasEdge("A", "B"),
  bHasC: graph.hasEdge("B", "C"),
});
