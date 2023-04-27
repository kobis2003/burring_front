export interface BlurringImage {
  name: string;
  data: string;
}

export interface Filter {
  name: string;
  params?: any
}


export interface ImageResult {
  image_result: BlurringImage;
  image_filter: Filter;
}


export interface ProcessOutput {
  image_results: ImageResult[];
  initial_images: BlurringImage[];
}




