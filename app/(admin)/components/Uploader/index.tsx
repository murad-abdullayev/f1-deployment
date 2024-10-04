"use client";

import { UploadButton } from "@/app/utils/uploadthing";

type Props = {
  onClientUploadComplete: ((data: any) => void) | undefined;
  onUploadError: ((error: any) => void) | undefined;
};

export default function Uploader({
  onClientUploadComplete,
  onUploadError,
}: Props): JSX.Element {
  return (
    <main className="">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={onClientUploadComplete}
        onUploadError={onUploadError}
      />
    </main>
  );
}
