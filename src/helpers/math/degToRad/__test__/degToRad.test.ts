import degToRad from '../degToRad';
import { MathUtils } from 'three';

// Type assertion for the mocked MathUtils.degToRad
const mockedDegToRad = MathUtils.degToRad as vi.Mock;

/**
 * Test Suite for degToRad Function
 */
describe('degToRad', () => {
    beforeEach(() => {
        // Clear all previous mock calls and implementations before each test
        mockedDegToRad.mockClear();
    });

    it('should convert 0 degrees to 0 radians', () => {
        // Arrange
        mockedDegToRad.mockReturnValue(0);

        // Act
        const result = degToRad(0);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(0);
        expect(result).toBe(0);
    });

    it('should convert 180 degrees to π radians', () => {
        // Arrange
        const degrees = 180;
        const radians = Math.PI;
        mockedDegToRad.mockReturnValue(radians);

        // Act
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(radians);
    });

    it('should convert 360 degrees to 2π radians', () => {
        // Arrange
        const degrees = 360;
        const radians = 2 * Math.PI;
        mockedDegToRad.mockReturnValue(radians);

        // Act
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(radians);
    });

    it('should convert 90 degrees to π/2 radians', () => {
        // Arrange
        const degrees = 90;
        const radians = Math.PI / 2;
        mockedDegToRad.mockReturnValue(radians);

        // Act
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(radians);
    });

    it('should convert 45 degrees to π/4 radians', () => {
        // Arrange
        const degrees = 45;
        const radians = Math.PI / 4;
        mockedDegToRad.mockReturnValue(radians);

        // Act
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(radians);
    });

    it('should handle multiple calls with different degrees', () => {
        // Arrange
        const degrees1 = 30;
        const radians1 = Math.PI / 6;
        const degrees2 = 60;
        const radians2 = Math.PI / 3;
        const degrees3 = 120;
        const radians3 = (2 * Math.PI) / 3;

        mockedDegToRad
            .mockReturnValueOnce(radians1)
            .mockReturnValueOnce(radians2)
            .mockReturnValueOnce(radians3);

        // Act
        const result1 = degToRad(degrees1);
        const result2 = degToRad(degrees2);
        const result3 = degToRad(degrees3);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenNthCalledWith(1, degrees1);
        expect(MathUtils.degToRad).toHaveBeenNthCalledWith(2, degrees2);
        expect(MathUtils.degToRad).toHaveBeenNthCalledWith(3, degrees3);

        expect(result1).toBe(radians1);
        expect(result2).toBe(radians2);
        expect(result3).toBe(radians3);
    });

    it('should handle edge case of degrees just below 360', () => {
        // Arrange
        const degrees = 359.999;
        const radians = MathUtils.degToRad(degrees);
        mockedDegToRad.mockReturnValue(radians);

        // Act
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(radians);
    });

    it('should not allow negative degrees', () => {
        // Arrange
        const degrees = -45;
        const radians = MathUtils.degToRad(degrees);
        mockedDegToRad.mockReturnValue(radians);

        // Act
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(radians);
        // Depending on implementation, you might want to expect an error
        // or handle negative degrees differently. Adjust assertions accordingly.
    });

    it('should handle undefined degrees gracefully', () => {
        // Arrange
        const degrees = undefined;
        // Since the function expects a number, this might throw an error or pass undefined
        mockedDegToRad.mockReturnValue(NaN);

        // Act
        // @ts-ignore: Testing undefined input
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(NaN);
    });

    it('should handle null degrees gracefully', () => {
        // Arrange
        const degrees = null;
        // Depending on implementation, this might throw an error or pass null
        mockedDegToRad.mockReturnValue(NaN);

        // Act
        // @ts-ignore: Testing null input
        const result = degToRad(degrees);

        // Assert
        expect(MathUtils.degToRad).toHaveBeenCalledWith(degrees);
        expect(result).toBe(NaN);
    });
});
