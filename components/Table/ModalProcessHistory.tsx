// ModalProcessHistory.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Modal, Textarea, TextInput } from '@mantine/core';
import { IProcessHistory } from './types';

interface ModalProcessHistoryProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: IProcessHistory) => void;
  defaultValues?: IProcessHistory;
}

const schema = z.object({
  processName: z.string().min(1, 'Nome do processo é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  observation: z.string().optional(),
  date: z.string().optional(),
});

export function ModalProcessHistory({
  opened,
  onClose,
  onSubmit,
  defaultValues,
}: ModalProcessHistoryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProcessHistory>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={defaultValues ? 'Editar Histórico de Processo' : 'Adicionar Histórico de Processo'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nome do Processo"
          {...register('processName')}
          error={errors.processName?.message}
          required
        />
        <TextInput label="Status" {...register('status')} error={errors.status?.message} required />
        <Textarea label="Observação" {...register('observation')} />
        <TextInput label="Data" type="date" {...register('date')} />

        <Button type="submit" fullWidth mt="16px">
          {defaultValues ? 'Atualizar Processo' : 'Adicionar Processo'}
        </Button>
      </form>
    </Modal>
  );
}
