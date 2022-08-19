package tech2.microservice.utls;

import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
public class DateParser {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    public static Date parseString(String strDate) {
        try {
            return dateFormat.parse(strDate);
        } catch (ParseException e) {
            log.info(e.getMessage());
            return null;
        }
    }
    public static String parseDate(Date date) {
        try{
            return dateFormat.format(date);
        } catch (Exception e) {
            log.info(e.getMessage());
            return "";
        }
    }
}
