import {FilesService} from "./files.service";
import {Controller} from "@nestjs/common";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}
}
