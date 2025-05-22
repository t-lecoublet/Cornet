import { type LABELProps } from "../du-label/du-label.types";
import { type INPUTFIELDProps, type INPUTFIELDType } from "../du-input-field/du-input-field.types";

export interface LabelInputValidatorProps extends LABELProps, 
  Omit<INPUTFIELDProps, "type" | "size" | "ghost" | "variant"> {
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  title?: string;
  required?: boolean;
  inputType?: INPUTFIELDType;
}