import http from "@/http-common";
import {BlurringRun} from "@/models/Run";
import {ProcessOutput} from "@/models/ProccessData";

/* eslint-disable */
class BlurringRunService {
  get_run(run_id: any): Promise<BlurringRun> {
    return http.get(`/run/${run_id}`);
  }

  start_process(data: any): Promise<BlurringRun> {
    return http.post("/run/burring_process", data);
  }

  get_result_from_str(result_in_string: string): ProcessOutput {
    const json_text_result = result_in_string.split("'").join("\"").split("None").join("null")
    const result: ProcessOutput = JSON.parse(json_text_result);
    return result
  }

}

export default new BlurringRunService();
