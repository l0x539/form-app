import { Resource } from '@rest-hooks/rest';

export default class ItemResource extends Resource {
  readonly rate: number | undefined = undefined;
  readonly applied_to: string = '';
  readonly name: string = '';
  readonly applicable_items: number[] = [];

  pk() {
    return this.name;
  }

  static urlRoot = ''; // API goes here
}