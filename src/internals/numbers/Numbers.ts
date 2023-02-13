import { Fn, MergeArgs, placeholder } from "../core/Core";
import { Tuples } from "../tuples/Tuples";

export namespace Numbers {
  type Add2Impl<a, b> = [...Tuples.Range<a>, ...Tuples.Range<b>]["length"];

  type LessThanOrEqualImpl<
    a extends unknown[],
    b extends unknown[]
  > = a extends [infer _first, ...infer _rest]
    ? b extends [infer first, ...infer rest]
      ? LessThanOrEqualImpl<_rest, rest>
      : false
    : true;

  type LessThanImpl<a extends unknown[], b extends unknown[]> = a extends [
    infer _first,
    ...infer _rest
  ]
    ? b extends [infer first, ...infer rest]
      ? LessThanImpl<_rest, rest>
      : false
    : b extends [infer first, ...infer rest]
    ? true
    : false;

  export interface Add<
    n1 extends number | placeholder = placeholder,
    n2 extends number | placeholder = placeholder
  > extends Fn {
    output: MergeArgs<this["args"], [n1, n2]> extends [infer a, infer b, ...any]
      ? Add2Impl<a, b>
      : never;
  }

  export interface LessThanOrEqual<
    n1 extends number,
    n2 extends number | placeholder = placeholder
  > extends Fn {
    output: MergeArgs<this["args"], [n1, n2]> extends [infer a, infer b, ...any]
      ? LessThanOrEqualImpl<Tuples.Range<a>, Tuples.Range<b>>
      : never;
  }

  export interface LessThan<
    n1 extends number,
    n2 extends number | placeholder = placeholder
  > extends Fn {
    output: MergeArgs<this["args"], [n1, n2]> extends [infer a, infer b, ...any]
      ? LessThanImpl<Tuples.Range<a>, Tuples.Range<b>>
      : never;
  }
}

