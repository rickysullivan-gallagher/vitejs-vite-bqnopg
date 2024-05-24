import {
  ActionGroup,
  Button,
  ButtonGroup,
  defaultTheme,
  Flex,
  Form,
  Item,
  NumberField,
  Provider,
  Slider,
  Switch,
  Text,
  useNumberFormatter,
  View,
  Well,
} from '@adobe/react-spectrum';

import UserAdd from '@spectrum-icons/workflow/UserAdd';
import UserExclude from '@spectrum-icons/workflow/UserExclude';
import { useState } from 'react';

const calculateNumberOfCodes = (usersCount, userCodeLenth) => {
  const numberOfCodes = Math.pow(usersCount, userCodeLenth);
  return numberOfCodes;
};

function App() {
  const defaults = {
    numberOfUsers: 10,
    userCodeLength: 6,
  };

  const formatter = useNumberFormatter();

  const [userCodeLength, setUserCodeLength] = useState(defaults.userCodeLength);
  const [numberOfUsers, setNumberOfUsers] = useState(defaults.numberOfUsers);
  const [availableCodes, setAvailableCodes] = useState(
    calculateNumberOfCodes(numberOfUsers, userCodeLength)
  );

  const calc = () => {
    setAvailableCodes(calculateNumberOfCodes(numberOfUsers, userCodeLength));
  };

  return (
    <Provider theme={defaultTheme}>
      <Flex direction="row" gap="size-100" alignItems="center">
        <View
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-100"
        >
          <Flex
            direction="column"
            gap="size-100"
            minWidth={500}
            alignItems="center"
          >
            <Well minWidth="90%">
              Available Codes: {formatter.format(availableCodes)}
            </Well>
            <Form>
              <NumberField
                label="Number of Users"
                defaultValue={numberOfUsers}
                minValue={1}
                value={numberOfUsers}
              />
              <Slider
                label="User Code length"
                defaultValue={6}
                minValue={4}
                maxValue={8}
                onChangeEnd={(value: number) => {
                  setUserCodeLength(value);
                  calc();
                }}
              />
              <Switch name="Duress Codes">Duress Codes</Switch>
              <ActionGroup isJustified>
                <Item key="add">
                  <UserAdd />
                  <Text>Add User</Text>
                </Item>
                <Item key="remove">
                  <UserExclude />
                  <Text>Remove User</Text>
                </Item>
              </ActionGroup>
            </Form>
          </Flex>
        </View>
      </Flex>
    </Provider>
  );
}

export default App;
