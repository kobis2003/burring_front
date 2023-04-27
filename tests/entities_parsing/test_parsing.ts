import {BlurringRun} from "@/models/Run";
import * as fs from 'fs';
import path from 'path';
import {ProcessOutput} from "@/models/ProccessData";
import BlurringRunService from "@/services/BlurringRunService";
describe('Test the entity parsing in typescript', () => {

    test('should parse the WS response when process is finished', () => {
        // we first try to parse the ws response
        let blurringRun: BlurringRun = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../files/finished_run_response.json'), 'utf-8'))
        expect(blurringRun).not.toBeNull()
        // now we test the result of the process parsing
        let processOutput: ProcessOutput = BlurringRunService.get_result_from_str(blurringRun.result!)
        expect(processOutput).not.toBeNull()
    })

    test('should parse the WS response when process is just started', () => {
        let blurringRun: BlurringRun = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../files/process_just_started_response.json'), 'utf-8'))
        expect(blurringRun).not.toBeNull()
    })

});