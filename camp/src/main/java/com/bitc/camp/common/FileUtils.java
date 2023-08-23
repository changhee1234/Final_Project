
package com.bitc.camp.common;
import com.bitc.camp.dto.FileDto;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Component
public class FileUtils {

  public List<FileDto> parseDisFileInfo(int idx, String id, MultipartHttpServletRequest uploadFiles) throws Exception {

    if (ObjectUtils.isEmpty(uploadFiles)) {
      return null;
    }

    List<FileDto> fileList = new ArrayList<>();

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    String current_date = simpleDateFormat.format(new Date());

    String path = "C:/upload/trade/" + current_date;

    File file = new File(path);

    if (!file.exists()) {
      file.mkdirs();
    }

    System.out.println("폴더 존재?");
    Iterator<String> iterator = uploadFiles.getFileNames();

    String newFileName;
    String originalFileExtension;
    String contentType;

    while (iterator.hasNext()) {
      List<MultipartFile> fileLists = uploadFiles.getFiles(iterator.next());
      for (MultipartFile multipartFile : fileLists) {
        if (!multipartFile.isEmpty()) {
          contentType = multipartFile.getContentType();
          if (ObjectUtils.isEmpty(contentType)) {
            break;
          } else {
            if (contentType.contains("image/jpeg")) {
              originalFileExtension = ".jpg";
            } else if (contentType.contains("image/png")) {
              originalFileExtension = ".png";
            } else if (contentType.contains("image/gif")) {
              originalFileExtension = ".gif";
            } else {
              break;
            }
          }

          newFileName = System.nanoTime() + originalFileExtension;
          FileDto File = new FileDto();
          File.setIdx(idx);
          File.setFileSize((int) multipartFile.getSize());
          File.setOriginalFileName(multipartFile.getOriginalFilename());
          File.setCampMainIdx(idx);
          File.setStoredFileName(current_date + "/" + newFileName);

          fileList.add(File);
          file = new File(path + "/" + newFileName);
          multipartFile.transferTo(file);
        }
      }
    }
    return fileList;
  }
}
