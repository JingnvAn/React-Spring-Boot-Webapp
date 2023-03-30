package com.sellerhelper.service;

import com.sellerhelper.constant.ErrorMessage;
import com.sellerhelper.constant.ValidationException;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
public class HolidayHelper {
    private final List<String> usTraditionalHolidayDates = Arrays.asList("01-02","01-16","05-29","06-19","07-04","09-04","11-10","11-23","12-25");
    private final Set<String> userDefinedHolidays = new HashSet<>();

    public List<String> getUserDefinedHolidays(){
        return this.userDefinedHolidays.stream().toList();
    }

    public List<String> getUsTraditionalHolidays() {
        LocalDate d = LocalDate.now(ZoneId.systemDefault());
        List<String> res = new ArrayList<>();
        for(String s : this.usTraditionalHolidayDates){
            res.add(s+"-"+d.getYear());
        }
        return res;
    }

    public void setUserDefinedHolidays(List<String> userDefinedHolidays) {
        this.userDefinedHolidays.addAll(userDefinedHolidays);
    }

    public boolean isUserDefinedHolidays(LocalDate input) {
        boolean found = false;
        for (String s : userDefinedHolidays){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
            LocalDate formattedDate = LocalDate.parse(s, formatter);
            if(input.getMonthValue() == formattedDate.getMonthValue() &&
                    input.getDayOfMonth() == formattedDate.getDayOfMonth() &&
                    input.getYear() == formattedDate.getYear()) {
                found = true;
            }
        }
        return found;
    }

    public boolean isTraditionalUsHoliday(LocalDate input) {
        LocalDate d = LocalDate.now(ZoneId.systemDefault());
        boolean found = false;
        for(String s : this.usTraditionalHolidayDates){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
            LocalDate formattedDate = LocalDate.parse(s+"-"+d.getYear(), formatter);
            if(input.getMonthValue() == formattedDate.getMonthValue() &&
                    input.getDayOfMonth() == formattedDate.getDayOfMonth() &&
                    input.getYear() == formattedDate.getYear()) {
                found = true;
            }
        }
        return found;
    }

    public boolean isHoliday(LocalDate localDate){
        return isTraditionalUsHoliday(localDate) || isUserDefinedHolidays(localDate);
    }

    public void validateDateFormat(String dateString) {
        // expected format: 03-28-2023
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
        sdf.setLenient(false); // enforce strict parsing
        try {
            sdf.parse(dateString);
        } catch (ParseException e) {
            throw new ValidationException(String.format(ErrorMessage.INVALID_DATE_FORMAT.getMessage(), dateString));
        }

    }
}
