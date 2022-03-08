import { render, screen } from "@testing-library/react";
import DatePicker from "./DatePicker";

test("renders datepicker", () => {
  const handleOnChange = jest.fn();
  render(<DatePicker value="Test" onChange={handleOnChange} />);
  
  const StartElement = screen.getByLabelText(/Deadline/i);
  expect(StartElement).toBeInTheDocument();
});