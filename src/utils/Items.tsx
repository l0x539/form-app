import { Resource } from '@rest-hooks/rest';

export default class ItemResource extends Resource {
  readonly id: number | undefined = undefined;

  pk() {
    return this.id?.toString();
  }

  static urlRoot = ''; // API goes here
}