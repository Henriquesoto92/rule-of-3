'use client';

import { use, useEffect } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActionIcon,
  Button,
  CopyButton,
  Flex,
  NumberInput,
  NumberInputProps,
  rem,
  Text,
  Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import image from './ocean.jpeg';

interface INumberInput extends NumberInputProps {
  placeholder: string;
  name: 'a' | 'b' | 'c' | 'result';
}
interface IFormRuleOf3 {
  a: number;
  b: number;
  c: number;
  result: number;
}

export default function HomePage() {
  const matches = useMediaQuery('(min-width: 500px)');
  const methods = useForm<IFormRuleOf3>({
    mode: 'all',
    defaultValues: {
      a: 0,
      b: 0,
      c: 0,
      result: 0,
    },
  });

  const { control, watch, setValue, reset } = methods;

  const valueA = Number(watch('a'));
  const valueB = Number(watch('b'));
  const valueC = Number(watch('c'));

  const calculateRuleOf3 = () => {
    if (valueA && valueB && valueC) {
      const result = (valueB * valueC) / valueA;
      setValue('result', result);
    }
  };

  const HandleResetForm = () => {
    reset({
      a: 0,
      b: 0,
      c: 0,
      result: 0,
    });
  };

  useEffect(() => {
    calculateRuleOf3();
  }, [valueA, valueB, valueC]);

  const NumberInputStyle = ({ placeholder, name, ...props }: INumberInput) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            placeholder={placeholder}
            hideControls
            maw={200}
            h="60px"
            radius={'lg'}
            decimalScale={5}
            flex="1"
            styles={{
              input: {
                cursor: name === 'result' ? 'copy' : 'text',
                minHeight: '60px',
                textAlign: 'center',
                fontSize: '30px',
                backgroundColor: name === 'result' ? '#a3dbf9' : 'white',
                opacity: 1,
                color: 'black',
              },
            }}
            {...props}
          />
        )}
      />
    );
  };
  return (
    <>
      <Flex
        direction={'column'}
        gap="10px"
        align={'center'}
        justify={'center'}
        style={{ backgroundImage: `url(${image.src})` }}
        p="24px"
        h="100dvh"
      >
        <Text
          component="h1"
          fz={'30px'}
          fw={700}
          ta={'center'}
          my="20px"
          bg="#a3dbf9"
          p="5px"
          style={{ borderRadius: '10px' }}
        >
          Regra de 3 simples e rápida
        </Text>
        <Flex justify="center" align="center" gap="10px" h="60px">
          <NumberInputStyle placeholder="A" name="a" />
          <Text bg="#013853" p="5px" c={'white'} style={{ borderRadius: '10px' }}>
            {' '}
            {matches ? 'ESTÁ PARA' : '='}
          </Text>
          <NumberInputStyle placeholder="B" name="b" />
        </Flex>
        <Text
          h="50px"
          bg="#013853"
          p="5px"
          c={'white'}
          style={{ borderRadius: '10px', alignContent: 'center' }}
          ta={'center'}
        >
          ASSIM COMO
        </Text>
        <Flex justify="center" align="center" gap="10px">
          <NumberInputStyle placeholder="C" name="c" flex={1} />
          <Text bg="#013853" c={'white'} p="5px" style={{ borderRadius: '10px' }}>
            {' '}
            {matches ? 'ESTÁ PARA' : '='}
          </Text>
          <Flex align={'center'} gap="10px" pos={'relative'} flex={1}>
            <NumberInputStyle placeholder="Resultado" name="result" disabled />

            <Flex pos={'absolute'} right={'10px'}>
              <CopyButton value="https://mantine.dev" timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copiado' : 'Copiar'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                      {copied ? (
                        <IconCheck style={{ width: rem(16), color: 'black' }} />
                      ) : (
                        <IconCopy style={{ width: rem(16), color: 'black' }} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
          </Flex>
        </Flex>
        <Button
          onClick={HandleResetForm}
          bg="#013853"
          p="10px"
          c={'white'}
          fz="20px"
          mih="fit-content"
        >
          Limpar campos
        </Button>
      </Flex>
    </>
  );
}
