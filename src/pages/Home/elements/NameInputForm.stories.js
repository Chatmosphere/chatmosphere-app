import * as React from 'react';
import { NameInputForm } from './NameInputForm';
import {action} from '@storybook/addon-actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/InputForm",
}

export const Default = () => <NameInputForm defaultSessionName="conference" onSubmit={(e)=>{e.preventDefault(); action("form submit")(e)}} handleChange={()=> {action("changing stuff")()}} />
