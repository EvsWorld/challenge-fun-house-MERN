import { CheckboxButton } from './CheckboxButton';
import { makeOptionsFromDictionary, technologyDict } from './regionDict';

// export interface TechnologyFilterProps {
//   // HINT: onChange receives final array of technologies to set back
//   onChange: (val: string[]) => void
//   technologies: string[]
// }

export function TechnologyFilter({ technologies, onChange }) {
  const technologiesOptions = makeOptionsFromDictionary(technologyDict);

  const handleCheck = (val, checked) => {
    if (checked) {
      let toSendToOnChangeIfChecked = [
        ...technologies.filter((v) => v !== val),
        val,
      ];
      onChange(toSendToOnChangeIfChecked);
    } else {
      let toSendToOnChangeIfNotChecked = [
        ...technologies.filter((v) => v !== val),
      ];
      onChange(toSendToOnChangeIfNotChecked);
    }
  };

  return (
    <>
      {technologiesOptions.map((tech) => (
        <CheckboxButton
          onChange={(x) => handleCheck(tech.value, x)}
          value={tech.value}
          label={tech.label}
          checked={technologies.includes(tech.value)}
          key={tech.value}
        />
      ))}
    </>
  );
}
