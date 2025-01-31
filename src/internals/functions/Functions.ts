import { Apply, Call, Fn, MergeArgs, placeholder } from "../core/Core";
import { Tuples } from "../tuples/Tuples";

export namespace Functions {
  export type _ = placeholder;

  export interface Identity extends Fn {
    output: this["args"][0];
  }

  interface PipeableApplyPartial<fn extends Fn, partialArgs extends any[]>
    extends Fn {
    output: Apply<fn, MergeArgs<this["args"], partialArgs>>;
  }

  export type ApplyPartial<
    fn extends Fn,
    args extends any[]
  > = PipeableApplyPartial<fn, args>;

  type ParametersImpl<fn> = fn extends (...args: infer args) => any
    ? args
    : never;

  export interface Parameters extends Fn {
    output: ParametersImpl<this["args"][0]>;
  }

  export interface Parameter<N extends number> extends Fn {
    output: ParametersImpl<this["args"][0]>[N];
  }

  type ReturnImpl<fn> = fn extends (...args: any[]) => infer ret ? ret : never;

  export interface Return extends Fn {
    output: ReturnImpl<this["args"][0]>;
  }

  type Head<xs> = xs extends [infer first, ...any] ? first : never;

  type ComposeImpl<fns extends Fn[], args> = fns extends [
    ...infer rest extends Fn[],
    infer last extends Fn
  ]
    ? ComposeImpl<rest, [Apply<last, args>]>
    : Head<args>;

  export interface Compose<fns extends Fn[]> extends Fn {
    output: ComposeImpl<fns, this["args"]>;
  }

  type ComposeLeftImpl<fns extends Fn[], args> = fns extends [
    infer first extends Fn,
    ...infer rest extends Fn[]
  ]
    ? ComposeLeftImpl<rest, [Apply<first, args>]>
    : Head<args>;

  export interface ComposeLeft<fns extends Fn[]> extends Fn {
    output: ComposeLeftImpl<fns, this["args"]>;
  }
}
