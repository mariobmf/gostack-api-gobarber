import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface IRequest {
  date: Date;
  providerId: string;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    const appointment = appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
