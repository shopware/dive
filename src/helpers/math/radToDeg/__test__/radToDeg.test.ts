import radToDeg from '../radToDeg';
import { MathUtils } from 'three/webgpu';

vi.mock('three/webgpu', async () => {
    const actual =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');

    return {
        ...actual,
        MathUtils: {
            ...actual.MathUtils,
            radToDeg: vi.fn(),
        },
    };
});

// Type assertion for the mocked MathUtils.radToDeg
const mockedRadToDeg = vi.mocked(MathUtils.radToDeg);

/**
 * Test Suite for radToDeg Function
 */
describe('radToDeg', () => {
    beforeEach(() => {
        // Clear all previous mock calls and implementations before each test
        mockedRadToDeg.mockClear();
    });

    it('should convert 0 radians to 0 degrees', () => {
        // Arrange
        mockedRadToDeg.mockReturnValue(0);

        // Act
        const result = radToDeg(0);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(0);
        expect(result).toBe(0);
    });

    it('should convert π radians to 180 degrees', () => {
        // Arrange
        const pi = Math.PI;
        mockedRadToDeg.mockReturnValue(180);

        // Act
        const result = radToDeg(pi);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(pi);
        expect(result).toBe(180);
    });

    it('should convert 2π radians to 0 degrees (wrapped)', () => {
        // Arrange
        const twoPi = 2 * Math.PI;
        mockedRadToDeg.mockReturnValue(360);

        // Act
        const result = radToDeg(twoPi);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(twoPi);
        expect(result).toBe(0);
    });

    it('should convert 3π/2 radians to 270 degrees', () => {
        // Arrange
        const threePiOver2 = (3 * Math.PI) / 2;
        mockedRadToDeg.mockReturnValue(270);

        // Act
        const result = radToDeg(threePiOver2);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(threePiOver2);
        expect(result).toBe(270);
    });

    it('should handle angles greater than 2π radians correctly', () => {
        // Arrange
        const sevenPi = 7 * Math.PI; // 1260 degrees
        const expectedDegrees = (1260 + 360) % 360; // 180 degrees
        mockedRadToDeg.mockReturnValue(1260);

        // Act
        const result = radToDeg(sevenPi);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(sevenPi);
        expect(result).toBe(expectedDegrees);
    });

    it('should handle fractional radians correctly', () => {
        // Arrange
        const fractionalRadians = Math.PI / 4; // 45 degrees
        mockedRadToDeg.mockReturnValue(45);

        // Act
        const result = radToDeg(fractionalRadians);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(fractionalRadians);
        expect(result).toBe(45);
    });

    it('should wrap negative angles correctly', () => {
        // Since the function does not handle negative inputs, this test ensures it behaves as expected
        // However, based on initial requirements, negative degrees are not allowed and inputs are non-negative
        // This test is optional and based on how you want the function to behave
        const negativeRadians = -Math.PI / 2; // -90 degrees
        mockedRadToDeg.mockReturnValue(-90);
        const expectedDegrees = (-90 + 360) % 360; // 270 degrees

        const result = radToDeg(negativeRadians);

        expect(MathUtils.radToDeg).toHaveBeenCalledWith(negativeRadians);
        expect(result).toBe(expectedDegrees);
    });

    it('should handle multiple full rotations correctly', () => {
        // Arrange
        const multipleRotations = 5 * 2 * Math.PI; // 360 * 5 = 1800 degrees
        const expectedDegrees = (1800 + 360) % 360; // 0 degrees
        mockedRadToDeg.mockReturnValue(1800);

        // Act
        const result = radToDeg(multipleRotations);

        // Assert
        expect(MathUtils.radToDeg).toHaveBeenCalledWith(multipleRotations);
        expect(result).toBe(0);
    });

    it('should handle mixed angles', () => {
        // Arrange
        const angles = [
            Math.PI / 6,
            Math.PI,
            (5 * Math.PI) / 3,
        ];
        const mockReturns = [
            30,
            180,
            300,
        ];
        const expectedDegrees = [
            (30 + 360) % 360,
            (180 + 360) % 360,
            (300 + 360) % 360,
        ]; // [30, 180, 300]

        mockedRadToDeg
            .mockReturnValueOnce(mockReturns[0])
            .mockReturnValueOnce(mockReturns[1])
            .mockReturnValueOnce(mockReturns[2]);

        // Act & Assert for each angle
        angles.forEach((angle, index) => {
            const result = radToDeg(angle);
            expect(MathUtils.radToDeg).toHaveBeenNthCalledWith(
                index + 1,
                angle,
            );
            expect(result).toBe(expectedDegrees[index]);
        });
    });
});
