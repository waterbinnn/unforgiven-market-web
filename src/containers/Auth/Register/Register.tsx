'use client';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import CommonStyle from '../../../styles/authStyle.module.scss';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components';
import { useState } from 'react';
import { BuyerSignupReq, SellerSignupReq } from '@/types';
import { checkCompanyNumber, checkIdValidation, buyerSignup, sellerSignup } from '@/actions';
import { message } from 'antd';
import { Button } from '@waterbin/ui-kit';

const cx = classNames.bind({ ...styles, ...CommonStyle });

interface Props {
  type: 'BUYER' | 'SELLER';
}

type InputValidation = 'none' | 'error' | 'valid';

export const idRule = /^[a-zA-Z0-9]{6,16}$/;
export const pwRule = /^[a-zA-Z0-9!@#$%^&*()_\-\+=[\]{}';":,./<>?]{8,18}$/g;
export const numberRule = /^[0-9]+$/;

export const Register = ({ type }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [checkIdValid, setCheckIdValid] = useState<InputValidation>('none');
  const [registrationNumberValid, setRegistrationNumberValid] = useState<InputValidation>('none');
  const [registrationNumberMsg, setRegistrationNumberMsg] = useState<string>('');
  const [checkIdValidMsg, setCheckIdValidMsg] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const handleRouter = (path: string) => {
    router.push(path);
  };

  //아이디(username) 유효성 검사위한 함수
  const onCheckIdValid = async () => {
    const username = getValues('username');
    const { data, success } = await checkIdValidation(username);

    if (success) {
      if (username.length > 1 && username.match(idRule)) {
        setCheckIdValid('valid');
        setCheckIdValidMsg('사용 가능한 아이디 입니다.');
      } else {
        setCheckIdValid('error');
        setCheckIdValidMsg('20자 이내의 영어 소문자, 대문자, 숫자를 조합해 입력해주세요.');
      }
    } else {
      setCheckIdValid('error');
      setCheckIdValidMsg(data.response.data.FAIL_Message);
    }
  };

  //사업자등록번호(company_registration_number) 유효성 검사 위한 함수
  const onCheckStoreNameValid = async () => {
    const company_registration_number = getValues('company_registration_number');

    const { data, success } = await checkCompanyNumber(company_registration_number);
    if (success) {
      setRegistrationNumberValid('valid');
      setRegistrationNumberMsg('사용할 수 있는 번호입니다.');
    } else {
      setRegistrationNumberValid('error');
      setRegistrationNumberMsg(data.response.data.FAIL_Message);
    }
  };

  const onFinish = async (data: any) => {
    const createFormData = (additionalData: any = {}) => ({
      username: data.username,
      password: data.password,
      password2: data.password2,
      phone_number: '0' + parseInt(data.firstNum) + data.middleNum + data.lastNum,
      name: data.name,
      ...additionalData,
    });

    const formData: BuyerSignupReq = createFormData();
    const sellerFormData: SellerSignupReq = createFormData({
      store_name: data.store_name,
      company_registration_number: data.company_registration_number,
    });

    if (checkIdValid === 'valid' && isAgree) {
      if (type === 'BUYER') {
        //구매자 회원가입 로직
        const { success, res } = await buyerSignup(formData);
        if (!success) {
          const message = res.response.data;
          if (message.phone_number) {
            handlePhoneError(message.phone_number[0]);
          }
        }
        if (success) {
          message.success('가입이 완료되었습니다. 로그인 후 사용해 주세요.');
          handleRouter(`/signin`);
        }
      } else {
        //판매자 회원가입 로직
        const { success, res } = await sellerSignup(sellerFormData);
        if (!success) {
          const message = res.response.data;
          if (message.store_name) {
            setValue('store_name', '');
            setError('store_name', { type: 'custom', message: message.store_name[0] });
          }
          if (message.phone_number) {
            handlePhoneError(message.phone_number[0]);
          }
        } else {
          message.success('가입이 완료되었습니다. 로그인 후 사용해 주세요.');
          handleRouter('/signin/seller');
        }
      }
    } else {
      if (!isAgree) {
        message.info('이용약관 및 개인정보처리방침에 동의해 주세요.');
      } else if (checkIdValid === 'none') {
        message.info('Check for ID availability');
      }
    }
  };

  const handlePhoneError = (message: string) => {
    setValue('middleNum', '');
    setValue('lastNum', '');
    setPhoneError(message);
  };

  return (
    <div className="container">
      <div className={cx('auth-container')}>
        <main className={cx('auth-inner-container')}>
          <h1 className={cx('visually-hidden')}>{type} SIGNUP</h1>

          <form className={cx('auth-wrap')} onSubmit={handleSubmit(onFinish)}>
            <h3 className={cx('title', 'top')}>{type}</h3>
            <h3 className={cx('title', 'bottom')}>SIGNUP</h3>
            <div className={cx('inputs-wrap')}>
              {/* ID */}
              <Input
                maxLength={20}
                placeholder="ID"
                {...register('username', {
                  required: '20자 이내의 영어 소문자, 대문자, 숫자를 조합해 입력해주세요.',
                  pattern: {
                    value: idRule,
                    message: '20자 이내의 영어 소문자, 대문자, 숫자를 조합해 입력해주세요.',
                  },
                })}
                needBtn
                btnText={'Check for the availability'}
                handleButton={onCheckIdValid}
                messageText={checkIdValidMsg}
                needMessage
                error={checkIdValid === 'error' ? true : false}
                isInputError={checkIdValid}
              />

              {/* PASSWORD */}
              <Input
                placeholder="PASSWORD"
                type="password"
                maxLength={18}
                {...register('password', {
                  required:
                    '영문, 숫자, 특수문자(~!@#$%^&*) 중 2가지 이상을 조합해 8~18자 내로 입력해주세요.',
                  pattern: {
                    value: pwRule,
                    message:
                      '영문, 숫자, 특수문자(~!@#$%^&*) 중 2가지 이상을 조합해 8~18자 내로 입력해주세요.',
                  },
                })}
                isInputError={errors.password ? 'error' : 'none'}
                needMessage
                messageText={errors.password?.message ?? null}
                error={errors.password ? true : false}
              />

              {/* VERIFY PASSWORD */}
              <Input
                placeholder="VERIFY PASSWORD"
                type="password"
                needMessage
                error={errors.password2?.message ? true : false}
                isInputError={errors.password2 ? 'error' : 'none'}
                messageText={errors.password2?.message ?? null}
                {...register('password2', {
                  required: '비밀번호가 일치하지 않습니다.',
                  validate: (value) =>
                    value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
              />

              {/* NAME */}
              <Input
                placeholder="NAME"
                {...register('name', {
                  required: '이 필드는 필수 항목입니다. 2글자 이상 입력해 주세요.',
                  minLength: 2,
                })}
                error={errors.name ? true : false}
                isInputError={errors.name ? 'error' : 'none'}
                messageText={errors.name?.message ?? null}
                needMessage
              />

              {/* Phone Number */}
              <div className={cx('phoneNum-wrap')}>
                <Input
                  className={cx('phone-input')}
                  {...register('firstNum', {
                    required: true,
                    valueAsNumber: true,
                    onChange: (e) => {
                      setValue('firstNum', e.target.value.slice(2, 3));
                    },
                  })}
                  defaultValue="010"
                  type="number"
                  error={errors.firstNum ? true : false}
                  isInputError={errors.firstNum ? 'error' : 'none'}
                />
                <Input
                  className={cx('phone-input')}
                  {...register('middleNum', {
                    required: true,
                    valueAsNumber: true,
                    onChange: (e) => setValue('middleNum', e.target.value.slice(0, 4)),
                  })}
                  error={errors.middleNum ? true : false}
                  isInputError={errors.middleNum ? 'error' : 'none'}
                  type="number"
                />
                <Input
                  className={cx('phone-input')}
                  {...register('lastNum', {
                    required: true,
                    valueAsNumber: true,
                    onChange: (e) => {
                      setValue('lastNum', e.target.value.slice(0, 4));
                    },
                  })}
                  type="number"
                  error={errors.lastNum ? true : false}
                  isInputError={errors.lastNum ? 'error' : 'none'}
                />
              </div>
              <span className={cx('valid-message')}>{phoneError}</span>

              {/* 판매자 회원가입 시  */}
              {type === 'SELLER' && (
                <>
                  {/* Company Registration Number */}
                  <Input
                    placeholder="COMPANY REGISTRATION NUMBER (only number)"
                    {...register('company_registration_number', {
                      required: true,
                    })}
                    needBtn
                    type={'number'}
                    btnText={'certificate'}
                    handleButton={onCheckStoreNameValid}
                    messageText={registrationNumberMsg}
                    needMessage
                    error={registrationNumberValid === 'error' ? true : false}
                    isInputError={registrationNumberValid}
                  />
                  {registrationNumberValid === 'none' && errors.company_registration_number && (
                    <span className={cx('valid-message')}>
                      company_registration_number 필드를 추가해주세요 :)
                    </span>
                  )}
                  {/* STORE NAME */}
                  <Input
                    needMessage
                    placeholder="STORE NAME"
                    isInputError={errors.store_name ? 'error' : 'none'}
                    messageText={errors.store_name?.message}
                    error={errors.store_name ? true : false}
                    {...register('store_name', {
                      required: '이 필드는 필수 항목입니다.',
                    })}
                  />
                </>
              )}

              {/* Checkbox */}
              <div className={cx('checkbox-wrap')}>
                <button
                  type="button"
                  className={cx('checkbox', { active: isAgree })}
                  onClick={() => setIsAgree(!isAgree)}
                />
                <label
                  className={cx('checkbox-text')}
                  htmlFor="agreement"
                  onClick={() => setIsAgree(!isAgree)}
                >
                  UNFORGIVEN의 이용약관 및 개인정보처리방침에 대한
                  <br />
                  내용을 확인하였고 동의합니다.
                </label>
              </div>
            </div>

            <div className={cx('btn-wrap')}>
              <Button color="green" fullWidth type="submit" rounded>
                SIGN UP
              </Button>
            </div>
          </form>
          <div className={cx('signup-btn')}>
            <Button
              variant={'link'}
              outlineColor={'yellow'}
              onClick={() => handleRouter(type === 'BUYER' ? '/signup/seller' : '/signup')}
            >
              {type === 'BUYER' ? 'SELLER' : 'BUYER'} SIGNUP
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};
