import React from 'react';
import {connect} from "react-redux";
import Input from 'arui-feather/input';
import RadioGroup from 'arui-feather/radio-group';
import Radio from 'arui-feather/radio';
import Card from './component/card/card';
import Button from "arui-feather/button";
import axios from 'axios';
import Label from 'arui-feather/label';

const url = "";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: '',
            currency: '₽',
            isCorrectSum: true,
            paymentResultInfo: ''
        };

        this.card = React.createRef();
    }

    async handleSubmit() {
        const isCorrectSum = this.state.sum === '' ? false : this.state.isCorrectSum;
        await this.setState({isCorrectSum: isCorrectSum});

        const cardInfo = await this.card.current.getCardInfo();

        if (cardInfo !== null && this.state.isCorrectSum) {
            cardInfo.sum = this.state.sum;
            cardInfo.currency = this.state.currency;
            axios.post(url, cardInfo)
                .then(res => {
                    console.log(res.data);
                    console.log(res);
                    this.props.onAddPayment(res.data);
                    this.setState({
                        paymentResultInfo: "Платеж выполнен!"
                    });
                })
                .catch(res => {
                    this.setState({
                        paymentResultInfo: "Платеж не выполнен, " +  (res.status < 500 ? 'ошибка клиента' : 'ошибка сервера')
                    });
                })
                .finally(_ => {
                })
        }
    }

    render() {
        return (
            <div className='payment-component'>
                <div className='row payment-result-info'>
                    <Label size='xl'>
                        {this.state.paymentResultInfo}
                    </Label>
                </div>
                <div className='row sum'>
                    <Input size='xl' placeholder='Введите сумму' type='number'
                           error={!this.state.isCorrectSum ? 'Сумма платежа д.б. больше нуля' : null}
                           onChange={value => this.setState({
                               sum: value,
                               isCorrectSum: Number(value) > 0
                           })}
                           rightAddons={
                               <RadioGroup type='button'
                                           onChange={(value, isChecked) => this.setState({currency: value})}>
                                   {
                                       ['₽', '$', '€'].map(item => (
                                           <Radio
                                               key={item}
                                               size='s'
                                               text={item}
                                               type='button'
                                               value={item}
                                           />
                                       ))
                                   }
                               </RadioGroup>
                           }/>
                </div>
                <div className='row'>
                    <Card ref={this.card}/>
                </div>
                <div className='row payment'>
                    <Button view='extra' size='xl' onClick={this.handleSubmit.bind(this)}>Оплатить</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        onAddPayment: payment => {
            dispatch({type: 'ADD_PAYMENT'})
        }
    })
)(App)


