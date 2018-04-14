package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Setting entity.
 */
public class SettingDTO implements Serializable {

    private Long id;

    private String variable;

    private String value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVariable() {
        return variable;
    }

    public void setVariable(String variable) {
        this.variable = variable;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SettingDTO settingDTO = (SettingDTO) o;
        if(settingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), settingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SettingDTO{" +
            "id=" + getId() +
            ", variable='" + getVariable() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
