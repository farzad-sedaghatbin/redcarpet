package ir.winners.redcarpet.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Error entity.
 */
public class ErrorDTO implements Serializable {

    private Long id;

    private ZonedDateTime moment;

    private String log;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getMoment() {
        return moment;
    }

    public void setMoment(ZonedDateTime moment) {
        this.moment = moment;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ErrorDTO errorDTO = (ErrorDTO) o;
        if(errorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), errorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ErrorDTO{" +
            "id=" + getId() +
            ", moment='" + getMoment() + "'" +
            ", log='" + getLog() + "'" +
            "}";
    }
}
