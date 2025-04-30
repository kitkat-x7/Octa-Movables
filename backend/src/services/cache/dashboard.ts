import NodeCache from "node-cache";
import { Matrics } from "../../util/types";

const myCache = new NodeCache({ stdTTL: 100 });
export const set_Metrics_cache = (data: Matrics) => {
  myCache.set("metrics", data);
};
export const get_Metrics_cache = async () => {
  return await myCache.get("metrics") as Matrics;
};
