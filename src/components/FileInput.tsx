import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileInput() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "1px solid #C4C4C4",
        backgroundColor: "rgba(245, 245, 245, 0.5)",
        height: 200,
      }}
    >
      <input {...getInputProps()} />
      <Stack
        justifyContent={"center"}
        alignItems="center"
        sx={{
          height: "100%",
        }}
      >
        <Image
          src="/icons/cloud-computing.svg"
          alt="cloud computing"
          height={94}
          width={94}
        />
        {isDragActive ? (
          <Box
            component="p"
            sx={{
              color: "rgba(113, 108, 108, 0.67)",
              font: "normal normal normal 12px/18px Inter, sans-serif",
            }}
          >
            Drop the files here ...
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: "rgba(113, 108, 108, 0.67)",
              font: "normal normal 600 20px/30px Inter, sans-serif",
              // fontWeight: 600,
            }}
          >
            Drag and drop a file here or click to upload
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default FileInput;
