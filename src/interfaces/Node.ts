import DataFile from './DataFile';

export default interface Node {
  data:DataFile,
  next:Node,
  back: Node
}
